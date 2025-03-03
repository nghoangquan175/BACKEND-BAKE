import authRouterCustomer from "./customer/auth"

// import authRouterOwner from "./owner/auth"
// import professionRouterOwner from "./owner/profession"

import storeRoute from "./owner/index"

const initRouterWeb = (app) => {
    //customer
    app.use("/v1/auth", authRouterCustomer)

    //store
    app.use("/", storeRoute)
}

export default initRouterWeb