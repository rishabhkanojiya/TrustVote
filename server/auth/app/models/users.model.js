const { Model } = require("objection");
const { billSplitDB } = require("../../connections/postgres.init");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    DoesNotExistError,
    AlreadyExistError,
    UnauthorizedError,
} = require("../utils/errors.utils.js");
const conf = require("../../config");
const _ = require("lodash");

Model.knex(billSplitDB);

const omitPassword = (user) => {
    return _.omit(user, ["password"]);
};

class UserModel extends Model {
    static get tableName() {
        return "users";
    }

    static get idColumn() {
        return "_id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: [
                "firstName",
                "lastName",
                "state",
                "city",
                "ssn",
                "email",
                "password",
            ],

            properties: {
                _id: { type: "number" },
                firstName: { type: "string" },
                lastName: { type: "string" },
                state: { type: "string" },
                city: { type: "string" },
                ssn: { type: "number", minLength: 9 },
                email: { type: "string", maxLength: 255 },
                password: { type: "string", minLength: 5 },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
            },
        };
    }

    async $beforeInsert() {
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    async $beforeUpdate(opt) {
        this.updatedAt = new Date().toISOString();
        delete this.createdAt;
    }

    static async createUser(user) {
        try {
            return await this.query().insertAndFetch({
                firstName: user.firstName,
                lastName: user.lastName,
                state: user.state,
                city: user.city,
                ssn: user.ssn,
                email: user.email,
                password: user.password,
            });
        } catch (err) {
            if (err.name === "UniqueViolationError") {
                throw new AlreadyExistError("SSN Already exists");
            }
            throw err;
        }
    }

    static async updateUser(userId, user) {
        try {
            const existingGroup = await this.query().findById(userId);

            if (!existingGroup) {
                throw new DoesNotExistError("No user found to update");
            }

            return await this.query().patchAndFetchById(userId, {
                firstName: user.firstName,
                lastName: user.lastName,
                state: user.state,
                city: user.city,
            });
        } catch (err) {
            throw err;
        }
    }

    static async getUser(filters) {
        return await this.query().findOne(filters);
    }

    static async getUserById(userId) {
        const user = await this.query().findById(userId);
        return { user: omitPassword(user) };
    }

    static async getUserBySSN(ssn) {
        const user = await this.query().findOne({ ssn });
        return { user: omitPassword(user) };
    }

    static async getUsers(pageNo, pageSize, searchTag) {
        const query = this.query().orderBy("createdAt", "desc");

        if (searchTag) {
            let splitSearch = searchTag.split(",");
            query.where("tags", "@>", splitSearch);
        }

        return await query.page(pageNo, pageSize);
    }

    static async deleteUserById(userId) {
        try {
            return await this.query().deleteById(userId).returning("*");
        } catch (err) {
            throw err;
        }
    }

    static async registerUser(userData) {
        try {
            const { firstName, lastName, email, state, city, ssn, password } =
                userData;

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await this.query().insert({
                firstName,
                lastName,
                state,
                city,
                email,
                ssn,
                password: hashedPassword,
            });

            return omitPassword(user);
        } catch (err) {
            if (err.name === "UniqueViolationError") {
                throw new AlreadyExistError("ssn Already exists");
            }
            throw err;
        }
    }

    static async loginUser(userData) {
        try {
            const { ssn, password } = userData;

            const user = await this.query().findOne({ ssn });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new UnauthorizedError("Invalid ssn or password.");
            }

            const token = jwt.sign({ userId: user._id }, conf.jwtSecret, {
                expiresIn: "7d",
            });

            return { user: omitPassword(user), token };
        } catch (error) {
            throw error;
        }
    }

    static async forgotPassword(userData) {
        try {
            const { email } = userData;

            const user = await UserModel.query().findOne({ email });

            if (!user) {
                throw new UnauthorizedError("Invalid email.");
            }

            const token = jwt.sign({ userId: user._id }, conf.jwtSecret, {
                expiresIn: "10m",
            });

            return { user: omitPassword(user), token };
        } catch (error) {
            throw error;
        }
    }

    static async resetPassword(userData) {
        try {
            const { token, password } = userData;

            const decoded = jwt.verify(token, conf.jwtSecret);

            const user = await UserModel.query().findById(decoded.userId);

            if (!user) {
                throw new UnauthorizedError("User not found.");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await UserModel.query()
                .patch({ password: hashedPassword })
                .findById(user._id);

            return { user: omitPassword(user), token };
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new UnauthorizedError("Invalid token.");
            }

            throw error;
        }
    }
}

module.exports = UserModel;
