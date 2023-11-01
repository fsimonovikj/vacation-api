"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductState = void 0;
var ProductState;
(function (ProductState) {
    ProductState[ProductState["IsDownloadable"] = 0] = "IsDownloadable";
    ProductState[ProductState["IsUpdateable"] = 1] = "IsUpdateable";
    ProductState[ProductState["DownloadingProduct"] = 2] = "DownloadingProduct";
    ProductState[ProductState["DownloadingContent"] = 3] = "DownloadingContent";
    ProductState[ProductState["DownloadedProduct"] = 4] = "DownloadedProduct";
    ProductState[ProductState["Unzipping"] = 5] = "Unzipping";
    ProductState[ProductState["Unzipped"] = 6] = "Unzipped";
    ProductState[ProductState["Installing"] = 7] = "Installing";
    ProductState[ProductState["Installed"] = 8] = "Installed";
    ProductState[ProductState["Running"] = 9] = "Running";
})(ProductState = exports.ProductState || (exports.ProductState = {}));
//# sourceMappingURL=types.js.map