const fs = require('fs')

const addTask = (title, text) => {
    if (title == '' || title == undefined) {
        throw console.log('Введите название задачи первыйм параметром к командею')
    } else {
        let data = text
        fs.appendFile('./tasks/' + title + '.txt', data, (error) => {
            if (error) throw console.log('Ошибка создания задачи', error);
            console.log("Задача " + title + " добавлена!");
        })
    }
}

const add = (title, text) => {
    fs.access('./tasks/', function(err) {
        if (err && err.code === 'ENOENT') {
            fs.mkdir('tasks', (err) => {
                addTask(title, text)
            });
        } else {
            addTask(title, text)
        }
    });
}

const update = (title, text) => {
    if (title == '' || title == undefined) {
        throw console.log('Введите название задачи первыйм параметром к командею')
    } else {
        let data = text
        fs.writeFile('./tasks/' + title + '.txt', data, (error) => {
            if (error) throw console.log('Ошибка обновления задачи');
            console.log("Задача " + title + " обновлена!");
        })

    }
}

const open = (title, param) => {
    if (title == '' || title == undefined) {
        throw console.log('Введите название задачи первым параметром к командею')
    } else {
        fs.readFile('./tasks/' + title + '.txt', (error, data) => {
            if (error) throw console.log('Ошибка открытия задачи');
            console.log(data.toString('utf8'));
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        })
        console.log(title)
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

    }
}
const del = (title, param) => {
    if (title == '' || title == undefined) {
        throw console.log('Введите название задачи первым параметром к командею')
    } else {
        fs.unlink('./tasks/' + title + '.txt', (error, data) => {
            if (error) throw console.log('Ошибка удаления задачи');
            console.log('Задача "' + title + '" удалена!');
        })
    }
}

const rename = (title, newTitle) => {
    if (title == '' || title == undefined) {
        throw console.log('Введите название задачи первым параметром к командею')
    } else {
        fs.rename('./tasks/' + title + '.txt', './tasks/' + newTitle + '.txt', function (err) {
            if (err) throw console.log('Не удалось переименовать задачу "' + title + '"', err);
            console.log('Задача "' + title + '" переименована на "' + newTitle + '"');
        });
    }
}

const readdir = () => {
    fs.readdir('./tasks/', (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    });
    console.log('Список задач')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
}

const delall = () => {
    fs.readdir('./tasks/', (err, files) => {
        files.forEach(file => {
            fs.unlink('./tasks/' + file, (error, data) => {
                if (error) throw console.log('Ошибка удаления задач');
                console.log(file + ' - удалена!');
            })
        });
    });
}

const help = () => {
    fs.readFile('help.txt', (error, data) => {
        if (error) throw console.log('Ой, а тут ничего нет!');
        console.log(data.toString('utf8'));
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    })
    console.log('Справка')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

}


module.exports = { add, update, open, del, rename, readdir, delall, help };