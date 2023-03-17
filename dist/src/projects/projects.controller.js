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
exports.save = exports.view = exports.index = void 0;
const projectsModel = __importStar(require("./projects.model"));
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const allProjects = yield projectsModel.getAll();
        res.send(allProjects);
    });
}
exports.index = index;
function view(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const specificProject = yield projectsModel.getById(id);
        res.send(specificProject);
    });
}
exports.view = view;
function save(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { project_name, description, repo_url, owner } = req.body;
        const payload = {
            project_name,
            description,
            repo_url,
            owner,
        };
        yield projectsModel.create(payload);
    });
}
exports.save = save;
