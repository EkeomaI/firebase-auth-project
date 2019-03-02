// jshint esversion:6

exports.get404 = (req, res) => {
    res.render('404',{
        pageTitle:'Error',
        currentState:false,
        userInfo:{}
    });
};

