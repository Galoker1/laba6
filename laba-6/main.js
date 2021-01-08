// GET:http://127.0.0.1:8000/get_all - Получить полный список
//GET:http://127.0.0.1:8000/get?id=x - Получить элемент
//POST:http://127.0.0.1:8000/create?name=x&surname=x&email=x&phone=x - Создать элемент
//PUT:http://127.0.0.1:8000/update?name=x&surname=x&email=x&phone=x&id=x - Редактировать элемент
//DELETE:http://127.0.0.1:8000/delete?id=x - Удалить элемент
const http = require('http');
const url = require('url');
const fs = require('fs')

let data = JSON.parse( fs.readFileSync('data.json','utf-8'));
let server = http.createServer((req,res) => {
    if (req.method == 'GET') {
        if (req.url == '/get_all'){
            let string = "";
            for (let i=0;i<data.length;i++){
                string+="Имя: "+data[i]["Имя"]+" Фамилия: "+data[i]["Фамилия"]+" E-mail: "+data[i]["E-mail"]+" Телефон: "+data[i]["Телефон"]+ "\n"
            }
            res.end(string)
        }
        else if(req.url.slice(0,4)=="/get"){
            let id = url.parse(req.url,true).query.id;
            if (id<data.length){
                res.end("Имя: "+data[id]["Имя"]+" Фамилия: "+data[id]["Фамилия"]+" E-mail: "+data[id]["E-mail"]+" Телефон: "+data[id]["Телефон"]);
            }
            else{res.end('Недопустимый индекс')}
        }}
    else if (req.method == 'POST'){
        if (req.url.slice(0,7) == '/create'){
            let name = url.parse(req.url,true).query.name;
            let surname = url.parse(req.url,true).query.surname;
            let email = url.parse(req.url,true).query.email;
            let phone = url.parse(req.url,true).query.phone;
            let new_user = {
                "Имя" : name,
                "Фамилия": surname,
                "Телефон" :phone,
                "E-mail" : email
            }
            data.push(new_user);
            fs.writeFileSync('data.json',JSON.stringify(data))
            res.end();}
    }
    else if (req.method == 'PUT'){
        if (req.url.slice(0,7) == '/update'){
           
            let id = url.parse(req.url,true).query.id;
            if (id < data.length){
                let name = url.parse(req.url,true).query.name;
                let surname = url.parse(req.url,true).query.surname;
                let email = url.parse(req.url,true).query.email;
                let phone = url.parse(req.url,true).query.phone;

                data[id]["Имя"]=name;
                data[id]["Фамилия"]=surname;
                data[id]["E-mail"]=email;
                data[id]["Телефон"]=phone;


                fs.writeFileSync('data.json',JSON.stringify(data))
                res.end();}

        else {res.end("Недопустимый индекс");}
        }
    }
    else if (req.method == 'DELETE'){
        if (req.url.slice(0,7)=="/delete"){
            let id = url.parse(req.url,true).query.id;
            if (id<data.length){
                data.splice(parseInt(id),1);
                fs.writeFileSync('data.json',JSON.stringify(data))
                res.end();
            }
            else {res.end("Недопустимый индекс");}
        }}
})
server.listen(8000,()=>{console.log('starting')})

