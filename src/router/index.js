import authRouterCustomer from "./customer/auth"

import authRouterOwner from "./owner/auth"
import professionRouterOwner from "./owner/profession"

import { home } from "../controller/owner/home"

const initRouterWeb = (app) => {
    //customer
    app.use("/v1/auth", authRouterCustomer)

    //store
    app.use("/v1/store/auth", authRouterOwner)
    app.use("/v1/store/profession", professionRouterOwner)

    app.use('/', home)
}

export default initRouterWeb