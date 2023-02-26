"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../dto");
const update_bank_request_1 = require("../../dto/bank/requests/update-bank.request");
const bank_service_1 = require("./bank.service");
let BankController = class BankController {
    constructor(bankService) {
        this.bankService = bankService;
    }
    async findAllBanks() {
        return this.bankService.findAllBanks();
    }
    async findBankById(id) {
        return this.bankService.findBankById(id);
    }
    async createBank(request) {
        return this.bankService.createBank(request);
    }
    async updateBank(data, id) {
        return this.bankService.updateBank(id, data);
    }
    async deleteBank(id) {
        await this.bankService.deleteBank(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '[FindAllBanks]',
        description: 'find all banks',
    }),
    (0, swagger_1.ApiResponse)({ type: [dto_1.BankResponse] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BankController.prototype, "findAllBanks", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[FindBank]',
        description: 'find bank',
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.BankResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "findBankById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '[CreateBank]',
        description: 'create bank',
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.BankResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BankRequest]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "createBank", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[UpdateBank]',
        description: 'update bank',
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.BankResponse }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_bank_request_1.UpdateBankRequest, Number]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "updateBank", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[DeleteBank]',
        description: 'delete bank',
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.BankResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "deleteBank", null);
BankController = __decorate([
    (0, common_1.Controller)('bank'),
    (0, swagger_1.ApiTags)('bank'),
    __metadata("design:paramtypes", [bank_service_1.BankService])
], BankController);
exports.BankController = BankController;
//# sourceMappingURL=bank.controller.js.map