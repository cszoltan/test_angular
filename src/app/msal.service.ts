import { Injectable } from '@angular/core';
import * as Msal from 'msal';
import { environment } from '../environments/environment';

@Injectable()
export class MsalService {

    B2CTodoAccessTokenKey = "b2c.todo.access.token";

    tenantConfig = {
        tenant: "cszoltan.onmicrosoft.com",
        clientID: environment.clientID,
        signUpSignInPolicy: "B2C_1_SiUpIn",
        b2cScopes: ["https://cszoltan.onmicrosoft.com/tohf/demo.read"]
    };

    // Configure the authority for Azure AD B2C
    authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;

    
    clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, this.authority,
        function (errorDesc: any, token: any, error: any, tokenType: any) {
        }
    );

    public login(): void {
        var _this = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
            _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
                function (accessToken: any) {
                    _this.saveAccessTokenToCache(accessToken);
                }, function (error: any) {
                    _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
                        function (accessToken: any) {
                            _this.saveAccessTokenToCache(accessToken);
                        }, function (error: any) {
                        });
                })
        }, function (error: any) {
        });
    }

    saveAccessTokenToCache(accessToken: string): void {
        sessionStorage.setItem(this.B2CTodoAccessTokenKey, accessToken);
    };

    logout(): void {
        this.clientApplication.logout();
    };

    isOnline(): boolean {
        return this.clientApplication.getUser() != null;
    };
}
