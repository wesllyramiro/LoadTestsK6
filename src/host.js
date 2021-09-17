export function host() {

    return {
        getHostName: () => 
        {
            var hostname;
    
            switch(__ENV.ENVIRONMENT.toUpperCase())
            {
                case "LOCAL":
                    hostname = "http://localhost:5000";
                    break;
                case "DSV":
                    hostname = "https://url_dsv";
                    break;
                case "HML":
                    hostname = "https://url_hml";
                    break;
                case "PRD":
                    hostname = "https://url_prd";
                    break;
                default:
                    throw "Ambiente não encontrado";
            }
    
            return hostname;
        }
    };
}