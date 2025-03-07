"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const employeeRouter = (0, express_1.Router)();
const employees = [
    {
        id: (0, uuid_1.v4)(),
        firstname: "John",
        lastname: "Smith",
        age: 25,
        isMarried: false,
    },
    {
        id: (0, uuid_1.v4)(),
        firstname: "Jane",
        lastname: "Doe",
        age: 30,
        isMarried: true,
    },
    {
        id: (0, uuid_1.v4)(),
        firstname: "James",
        lastname: "Bond",
        age: 35,
        isMarried: false,
    },
    {
        id: (0, uuid_1.v4)(),
        firstname: "Jason",
        lastname: "Bourne",
        age: 40,
        isMarried: true,
    },
    {
        id: (0, uuid_1.v4)(),
        firstname: "Jack",
        lastname: "Reacher",
        age: 45,
        isMarried: false,
    },
];
/**
 * Get all employees.
 *
 * @route GET /employees
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.get("/", (req, res) => {
    res.status(200).json(employees);
});
/**
 * Search employees by firstname.
 *
 * @route GET /employees/search?firstname=somevalue
 * @param {Request<{}, {}, {}, { firstname: string }>} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.get("/search", (req, res) => {
    const { firstname } = req.query;
    if (!firstname) {
        res.status(400).json({ message: "Missing query parameter: firstname" });
        return;
    }
    const results = employees.filter((employee) => employee.firstname.toLowerCase() === String(firstname).toLowerCase());
    if (results.length === 0) {
        res.status(404).json({ message: "No employees found" });
        return;
    }
    res.status(200).json(results);
});
/**
 * Update employee by ID.
 *
 * @route PUT /employees/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.put("/:id", (req, res) => {
    const employee = employees.find((e) => e.id === req.params.id);
    if (!employee) {
        res.status(404).send("Employee not found...");
        return;
    }
    Object.assign(employee, req.body);
    res.status(200).json(employee);
});
/**
 * Delete employee by ID.
 *
 * @route DELETE /employees/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const employeeIndex = employees.findIndex((employee) => employee.id === id);
    if (employeeIndex === -1) {
        res.status(404).send("Employee not found...");
        return;
    }
    employees.splice(employeeIndex, 1);
    res.status(200).json("Employee deleted successfully!");
});
/**
 * Get employee by ID.
 *
 * @route GET /employees/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const employee = employees.find((employee) => employee.id === id);
    if (!employee) {
        res.status(404).send("Employee not found...");
        return;
    }
    res.status(200).json(employee);
});
/**
 * Create a new employee.
 *
 * @route POST /employees
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
employeeRouter.post("/", (req, res) => {
    const { employee } = req.body;
    employees.push(employee);
    res.status(201).json("Employee created successfully!");
});
exports.default = employeeRouter;
