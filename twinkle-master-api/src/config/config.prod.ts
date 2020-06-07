 const config = {
    "Config": {
        "Port": 20200,
        "DBConnections": {
            "default": {
                "user": "facpuser",
                "password": "P@ssword123",
                "host": "facpdev.cwm3ubatqbgi.us-east-1.rds.amazonaws.com",
                "database": "facp_dev",
                "requestTimeout": 300000,
                "dbType": "mysql"
            }
        },
        "OktaConfig": {
            "url": "http://iff.okta.com/oauth2"
        },
        "AppSettings": {
            "defaultTotalRecords": 10,
            "exclude": [
                "/image",
                "/info",
                "/users"
            ]
        },
        "AppConfig": {
            "name": "NGX Seed",
            "version": "1.0.0"
        },
        "MDR": {
            "product": {
                "url": "https://ion-qas.iff.com/api/v1/products/"
            },
            "user": {
                "url": "https://ion-qas.iff.com/api/v1/users/"
            },
            "costbook": {
                "url": "https://ion-dev.iff.com/api/v1/products/costbooks"
            },
            "currency": {
                "url": "https://ion-dev.iff.com/api/v1/corp/currencies?active=true"
            }
        }
    }
}
export {config};