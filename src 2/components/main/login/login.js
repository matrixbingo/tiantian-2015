/**
 * Created by liang.wang on 15/11/8.
 */

var LOGIN = LOGIN || {};

angular.module('myApp', []).controller('loginCtrl', function ($scope) {
    $scope.telephone = "";
    $scope.password = "";
    $scope._pattern = {
        "phone" : "/^(13[0-9]{9})|(15[89][0-9]{8})$/"
        };
    $scope.login = function () {
        LOGIN.login({
            telephone: $scope.telephone,
            password: $scope.password
        })
    }
});

angular.module('myApp11', []).controller('loginCtrl', function ($scope) {
    $scope.mobile = "";
    $scope.login = function () {
        LOGIN.login({
            telephone: $scope.telephone,
            password: $scope.password
        })
    }
});

LOGIN.login = function (data) {
    data.password = hex_md5(data.password);
    main.post(main.action.userLogin, data, function(rep){
        main.ajaxMsg(rep, main.herf.index);
    })
}

/*

(document).ready(function() {
    $('#sasas')
        .bootstrapValidator({
            message: 'This value is not valid',
            //live: 'submitted',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {

                user: {
                    validators: {
                        notEmpty: {
                            message: 'The email address is required and can\'t be empty'
                        },
                        emailAddress: {
                            message: 'The input is not a valid email address'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The username must be more than 6 and less than 30 characters long'
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function (e) {
            // Prevent submit form
            //e.preventDefault();

            var $form = $(e.target),
                validator = $form.data('bootstrapValidator');
            $form.find('.alert').html('Thanks for signing up. Now you can sign in as ' + validator.getFieldElements('username').val()).show();
        });
});*/
