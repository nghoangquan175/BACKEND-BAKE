import formidable from 'formidable'
import path from 'path'
import appRoot from "app-root-path";

const uploadDir = `${appRoot}/src/public/imgs`
const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true
});

export default form
