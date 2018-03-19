const appbaseRef = new Appbase({
	url: "https://scalr.api.appbase.io",
	app: "streamingtestapp",
	credentials: "API-KEY"
})

const typeIndex = "books"

let jsonObject = {
	"department_name": "Books",
	"department_name_analyzed": "Books",
	"department_id": 1,
	"name": "A Fake Book on Network Routing",
	"price": 5595
}

function add(jsonObject){
    appbaseRef.index({
        type: typeIndex,
        id: "X4",
        body: jsonObject
    }).on('data', function(response) {
        console.log(`data: ${JSON.stringify(response)})`);
    }).on('error', function(error) {
        console.log(`error: ${error}`);
    })
}

function getInfo(idDocument){
    appbaseRef.get({
        type: typeIndex,
        id: idDocument
    }).on('data', function(response) {
        console.log(`data: ${JSON.stringify(response)}`)
        console.log(Object.keys(response))
        console.log(response._source.department_name)
        
    }).on('error', function(error) {
        console.log(`error: ${error}`)
    })    
}

function observe(idDocument){
    appbaseRef.getStream({
        type: typeIndex,
        id: idDocument
    }).on('data', function(response) {
        console.log("new document update: ", response)
    }).on('error', function(error) {
        console.log("getStream() failed with: ", error)
    });
}

function streamRichQuery(){
    appbaseRef.searchStream({
        type: typeIndex,
        body: {
            query: {
                match_all: {}
            }
        }
    }).on('data', function(response) {
        console.log("searchStream(), new match: ", response);
    }).on('error', function(error) {
        console.log("caught a searchStream() error: ", error)
    })
}

function updateInfo(idDocument, newInfo){
    appbaseRef.update({
        type: typeIndex,
        id: idDocument,
        body: {
            doc: newInfo
        }
    }).on('data', function(res) {
        console.log("successfully updated: ", res)
    }).on('error', function(err) {
        console.log("update document error: ", err)
    })
}

function deleteInfo(idDocument){
    appbaseRef.delete({
        type: typeIndex,
        id: idDocument
    }).on('data', function(res) {
        console.log("successfully deleted: ", res)
    }).on('error', function(err) {
        console.log("deletion error: ", err)
    })
}
let newValues = {
    "name": "some text",
	"price": 7000
}
function maps(){
    appbaseRef.getMappings().on('data', function(res) {
        console.log("Mapping scheme is: ", res)
    }).on('error', function(err) {
        console.log("getMappings() failed: ", err)
    })
}

function searchData(){
    appbaseRef.search({
        type: typeIndex,
        body: {
            query: {
                match_all: {}
            }
        }
    }).on('data', function(res) {
        console.log("query result: ", res)
    }).on('error', function(err) {
        console.log("search error: ", err)
    })
}


//add(jsonObject)
//getInfo("X1")
//observe("X2")
//updateInfo("X3", newValues)
//streamRichQuery()
//deleteInfo("X4")
//maps()
//searchData()
