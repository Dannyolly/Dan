/* let headers1 = {
    channel: 3,
    citycode: 'MO',
    content-type: 'application/json;charset=UTF-8',
    devicepsver: None,
    devicetype: 'iphone 6+',
    lantype: 1,
    origin: 'https://wap.aomi.mo',
    referer: 'https://wap.aomi.mo/spa/',
    //'sign': md5.hexdigest(),
    time: int(time.time()),
    userid: 8530000001,
    token: '',
    user-agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
} */

let headers2 = {
    'channel': 3,
    'citycode': 'MO',
    'content-type': 'application/json;charset=UTF-8',
    'devicepsver': '',
    'devicetype': 'iphone 6+',
    'lantype': 1,
    'origin': 'https://wap.aomi.mo',
    'referer': 'https://wap.aomi.mo/spa/',
     //'sign': md5.hexdigest(),
    'time': Number(Date.now()),
    'userid': 8530000001,
    'token': '',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
}

export{
    headers2
}