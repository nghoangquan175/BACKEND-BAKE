import { create } from 'express-handlebars';

const configTemplateEngine = (app) => {
    const hbs = create({
        extname: '.hbs', // Phần mở rộng file template

    });

    app.engine('hbs', hbs.engine); // Gắn engine đã tạo vào app
    app.set('view engine', 'hbs'); // Đặt view engine mặc định là 'hbs'
    app.set('views', 'src/views'); // Đường dẫn thư mục views
};

export default configTemplateEngine;
