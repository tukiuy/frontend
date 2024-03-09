import { match } from "assert";

export type endpoints = "CreatePurchase" | "GetPurchases";

const apiCall = {
    GetEvent: "/v1/Evento/ListarEventoPorId",
    AccessEvent: "/v1/Evento/InsertarAccesoEvento",
    GetPendingItems :"/v1/Evento/ObtenerEstadoUsuario",
    GetItems: "/v1/Articulos/ListarCatalogosPorIdEvento?",
    DeviceInEvent: "/v1/Compras/ObtenerComprasConRetirosRestantes"
}

const getRequestData = (endpoint: endpoints) : Request => {
    let url : URL;
    let apiKey: string;
    switch (endpoint) {
        case "CreatePurchase":
            url = new URL("/v1/Compras/CrearCompra", process.env.URL_API_COMPRAS);
            apiKey = process.env.API_KEY_COMPRAS as string;
            break;
        case "GetPurchases":
            url = new URL("/v1/Compras", process.env.URL_API_COMPRAS);
            apiKey = process.env.API_KEY_COMPRAS as string;
            break
        default:
            url = new URL("");
            apiKey = "";
            break;
    }
    return new Request(url, {
        headers: {
            "XApiKey": apiKey,
            "Content-Type": "application/json"
        },
        cache: "default",
        next: { revalidate: 3600 }
    });
}

export { getRequestData }