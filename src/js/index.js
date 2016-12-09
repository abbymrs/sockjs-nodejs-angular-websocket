angular.module('myApp', [
    'service.sock'
])
    .controller('mainCtrl', function ($scope, $websocket, $interval, sockService) {
        let value = null;
        $interval(() => {

            sockService.then(res=>{
                res = res.splice(0,1);
                console.log(res);
                document.querySelector('.text').innerHTML = res[0];
            })
        }, 1000);
    })
