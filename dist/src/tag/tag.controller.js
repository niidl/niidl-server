"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.filter = exports.view = void 0;
const tagModel = __importStar(require("./tag.model"));
function view(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projectId = parseInt(req.params.projectId);
            const allTagsByProject = yield tagModel.getAllTagsByProject(projectId);
            res.status(200).send(allTagsByProject);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
exports.view = view;
function filter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filterTag = req.params.filterTag;
            const allProjectsByTag = yield tagModel.getAllProjectsByTag(filterTag);
            res.status(200).send(allProjectsByTag);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
exports.filter = filter;
function save(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { tag_name, project_id } = req.body;
            const payload = {
                tag_name,
                project_id,
            };
            yield tagModel.create(payload);
            res.status(201);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
exports.save = save;
