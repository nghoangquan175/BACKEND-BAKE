import express from 'express';


const configStaticFile = (app) => {
    app.use(express.static('src/public'));
};

export default configStaticFile;
