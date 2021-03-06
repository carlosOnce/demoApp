import {PageIndex} from "./modul_js/page/pageIndex.js";
import { ManagerFunctions } from "./modul_js/function/manager_functions.js";

import { ViewClient } from "./modul_js/view/viewClient.js";
import {d,$} from "./modul_js/function/global.js";
import {STRATEGY} from "./modul_js/enum/enum_stratey.js";
import{FactoryDataControl} from "./modul_js/factory/factoryDataControl.js";
import { GeneralPurposeFunctions } from "./modul_js/function/general_purpose_functions.js";
import {FactoryImg} from "./modul_js/factory/factoryImg.js";

let url;
let dataControl;
const managerFunctions = new ManagerFunctions();
const viewClient = new ViewClient();
const factoryImg = new FactoryImg();

d.addEventListener("DOMContentLoaded", (e) => {

     PageIndex();

});

d.addEventListener("click", (e) => {
    let myBody = $("myBody");
    switch (e.target.id) {
      case "linkRegister":
          url = "/addClient";
          const globalFunction = new GeneralPurposeFunctions();
          globalFunction.resetAutoIncrementPhoneCP();      
          myBody.innerHTML = "";
          myBody.appendChild(viewClient.register());    
          managerFunctions.validations();     //vivo

          managerFunctions.phone();    // vivo
          managerFunctions.saveDataControls(); // muere
          managerFunctions.showIniStrategy(STRATEGY.ONETOONE); // muere
          break;
      case "linkLogin":  
        url = "/loginClient";
        myBody.innerHTML = "";
        myBody.appendChild(viewClient.login());    
        managerFunctions.validations();     
        managerFunctions.saveDataControls();
        managerFunctions.showIniStrategy(STRATEGY.ALL);   
        break;
      case "forgetPassword":
        url = "/forgetPassword";
        myBody.innerHTML = "";
        myBody.appendChild(viewClient.forgetPassword());    
        managerFunctions.validations();     
        managerFunctions.saveDataControls();
        managerFunctions.showIniStrategy(STRATEGY.ALL);
        $("informationPanel").innerHTML  = "Para que te hagamos llegar nuevas credenciales de acceso, introduce a continuación tu Nif y Email. Pulsa despues el botón Get Credentials.";
        break;
      case "uuidButton":
        const uuid =  $("uuid").value;
        let reset = true;
        managerFunctions.loader().on();
        url = "/unlockUUID";
        dataControl = {"uuid": uuid}; 
        managerFunctions.ajaxForm({
              url,
              dataControl,
              noresetControl
        });    
        break;
      case "submit":
          dataControl =  managerFunctions.getDataControls();     
          managerFunctions.loader().on();
          managerFunctions.ajaxForm({
            url,
            dataControl
          });     
    }
});
