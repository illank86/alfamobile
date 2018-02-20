import { extendObservable } from 'mobx';
import fetch from 'react-native-fetch-polyfill';

const live = 'https://glacial-cliffs-13214.herokuapp.com';
const develop = 'http://192.168.100.4:8000';
const timeout = 5 * 1000;

class ObservableListStore {
    constructor() {
        extendObservable (this, {listStore : []});
        extendObservable (this, {schedules : []});
        extendObservable (this, {reports : []});
    }
    
    fetchAll(clb) {        
        fetch(`${develop}/api/data/stores`, {timeout: timeout})
        .then(res => res.json())
        .then((stores) => {
            if(stores.error) {
                clb(stores)
            } else {
                this.listStore = stores;
                clb(false)
            }  
        })
        .catch(error => {            
            clb(error)
        });
    }

    addStore(name, address, topic, clb) {
        let data = {name, address, topic};    

        fetch(`${develop}/api/data/add-store`, { 
            method: "POST",                     
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },    
                    
            body: JSON.stringify(data)
        }, {timeout: timeout}) 
        .then((res) => res.json())
        .then((data) => {
            if(data.error) {
                clb(data);
            } else {
                clb(data);                
                this.fetchAll((msg) => {
                    return null
                });                  
            };
         })
        .catch(error => {            
            clb('TypeError: Network request failed');
        });
    }

    getOneSchedule(id, clb) {
        fetch(`${develop}/api/data/get-schedule/${id}`, {timeout: timeout})
        .then(res => res.json())
        .then((schedule) => {  
            this.schedules = schedule;
            clb(false)
        })
        .catch(error => {
            clb(error)
        });
    }

    getOneReport(id, clb) {
        fetch(`${develop}/api/data/get-report/${id}`, {timeout: timeout})
        .then(res => res.json())
        .then((report) => {  
            this.reports = report;
            clb(false)
        })
        .catch(error => {
            clb(error)
        });
    }

    saveSchedule(clb, {...myData}) {
        let datas = myData;
        
        fetch(`${develop}/api/data/add-schedule`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datas)
        }, {timeout: timeout})
        .then(res => res.json())
        .then(data => { 
           if(data.error) {
               clb(data.error);
           } else {
              clb(data.message);
              this.getOneSchedule(datas.id_store, (msg) => {
                  return null
              })             
           }
        })
        .catch(error => {
            clb(error)
        });       
    }

    updateSchedule(clb, item, {...myData}) {
        let datas = myData;
        
        fetch(`${develop}/api/data/update-schedule/${item}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datas)
        }, {timeout: timeout})
        .then(res => res.json())
        .then(data => { 
           if(data.error) {
               clb(data.error);
           } else {
              clb(data.message);
              this.getOneSchedule(datas.id_store, (msg) => {
                  return null
              })             
           }
        })
        .catch(error => {
            clb(error)
        });       
    }

    deleteOneStore(item, topic, clb) {
        fetch(`${develop}/api/data/delete-store/${item}/${topic}`, {
            method: 'delete'
        }, {timeout: timeout})
        .then(res => res.json())  
        .then((data) => {
            if(data.error) {
                clb(data.error);
            } else {
                clb(data.message);
                this.fetchAll((msg) => {
                    return null
                });  
            }                          
        })
        .catch(error => {
            clb(error)
        });
    }
}

const store = new ObservableListStore();

export default store;