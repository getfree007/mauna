import firebase from 'firebase';
import * as db from './db';
import moment from 'moment';
import message from 'framework7-vue/components/message';

const ProjectModule = {
    state: {
        projects_Chat: [],
        projects_users: [],
    },

    getters: {
        projects_Chat: state => state.projects_Chat,
        projects_users: state => state.projects_users,
    },

    mutations: {
        setProjects(state,payload) {
            state.projects_Chat = payload;
        },
        setProjectsUsers(state,payload) {
            state.projects_users = payload;
        },
        
    },

    actions: {
        
        createProject({},project) {
            var promise = new Promise((resolve,reject)=> {
                db.fireprojects
                .child(project.name)
                .set({
                    userName: project.list,
                    startDate: project.start,
                    endDate: project.end,
                    description: project.description,
                    status: project.status,
                    owner: firebase.auth().currentUser.uid,
                    email: project.email,
                    projectName:project.name
               })
                .then(data=>{
                    resolve(true)
                })
                .catch(err=>{
                    reject(err)
                })
            })
            return promise
        },
        removeProject({},proje) {
            db.fireprojects
            .once('value',snapshot=>{
                if (snapshot.val() != null) {
                    var projects = snapshot.val()          
                    for(var key in projects) {
                        if(projects[key].projectName == proje.name)
                        {
                            let re='/projects/'+key
                            var adaRef = firebase.database().ref(re);
                            adaRef.remove()
                        }
                    }
                }
            })
        },
        //Getting all the Projects
        getMyProjects({commit}) {
            db.fireprojects
            .once('value',snapshot=>{
                var myprojects = []
                if (snapshot.val() != null) {
                    var projects = snapshot.val()
                    for(var key in projects) {
                        
                        var project = {
                            
                            name: key,
                            description: projects[key].description,
                            owner: projects[key].owner,
                            endDate: projects[key].endDate,
                            startDate: projects[key].startDate,
                            userName: projects[key].userName,
                            status: projects[key].status,
                            email:projects[key].email,
                            projectName:projects[key].projectName
                        }
                        myprojects.push(project)
                    }
                }
                commit('setProjects',myprojects)
            })
        },
        //All Users in the platform - After this, we have to dispatch Locus Users
        getUserProjects({commit}) {
            db.fireprojects
            .once('value',snapshot=>{
                var myprojects = []
                if (snapshot.val() != null) {
                    var projects = snapshot.val()
                    for(var key in projects) {
                        if(projects[key].email == firebase.auth().currentUser.email)
                        {
                            var project = {
                                name: key,
                                description: projects[key].description,
                                owner: projects[key].owner,
                                endDate: projects[key].endDate,
                                startDate: projects[key].startDate,
                                userName: projects[key].userName,
                                status: projects[key].status,
                                email:projects[key].email,
                                projectName:projects[key].projectName
                            }
                            myprojects.push(project)
                        }
                    }
                }
                commit('setProjectsUsers',myprojects)
            })
        },
    }
}

export default ProjectModule;