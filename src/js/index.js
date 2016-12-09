angular.module('myApp', [
    'service.sock'
])
    .controller('mainCtrl', function ($scope, $websocket, $interval, sockService) {
        let value = null;
        $interval(() => {

            sockService.then(res => {
                res = res.splice(0, 1).join(',').split(',');
                console.log(res);

                if (res.length == 10) {
                    let dom = document.querySelector('.text');
                    let str = '';
                    for (let i = 0; i < res.length; i++) {
                        str += "<div>" + res[i] + "</div>";
                    }
                    dom.innerHTML = str;
                }

            })
        }, 1000);
    })
