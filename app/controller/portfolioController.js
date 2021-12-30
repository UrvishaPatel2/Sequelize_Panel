const { addForm, editForm } = require('../validations/portfolioValidation');
const portModel = require('../models/portfolioModel');
const categoryModel = require('../models/categoryModel')
const { logger } = require('../logger/logger');

exports.addData = async (req, res) => {
    try {
        const { error } = addForm(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {

            const name = req.body.categoryname
            console.log(name);
            const cat = await categoryModel.findAll({ attributes: ['id'], where: { categoryname: name } })
            const _id = cat[0].id;
            console.log(cat[0].id);



            const result = req.files.map(images => images.filename).toString();
            console.log(result);
            const data = {
                category_id: _id,
                pname: req.body.pname,
                uploadImage: result,
                ptitle: req.body.ptitle,
                url: req.body.url,
                pdate: req.body.pdate,
            }
            console.log(data)
            const portData = new portModel(data)
            portData.save()
                .then(data => {
                    res.send('Data Added')
                }).catch(ex => console.log(ex))
        }
    } catch (err) {
        logger.error(err);
    }
}

exports.findData = async (req, res) => {
    const cat = await categoryModel.findAll()
    categoryModel.hasMany(portModel, { foreignKey: 'categoryname' })
    portModel.belongsTo(categoryModel, { foreignKey: 'categoryname' })
    const users = await portModel.findAll({ include: [categoryModel], where: { category_id: categoryname } });
    res.send(users);
}

exports.findDataByid = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const users = await portModel.findByPk(id);
    if (users) {
        res.send(users)
    } else {
        res.send('Invalid Id')
    }
}

exports.editData = async (req, res) => {
    try {
        const { error } = editForm(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const name = req.body.categoryname
            console.log(name);
            const cat = await categoryModel.findAll({ attributes: ['id'], where: { categoryname: name } })
            const _id = cat[0].id;
            const image = req.files.map(images => images.filename).toString();
            const data = {
                category_id: _id,
                pname: req.body.pname,
                ptitle: req.body.ptitle,
                url: req.body.url,
                pdate: req.body.pdate,
                uploadImage: image,
            }
            const result = await portModel.update(data,
                { where: { id: req.params.id } }
            );
            if (result) {
                res.send('data update');
            }

        }
    } catch (err) {
        logger.error(err);
    }
}

exports.deleteData = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const users = await portModel.findByPk(id);
    if (users) {
        users.destroy(id);
        res.send('data deleted')

    } else {
        res.send('id not define')
    }
}
