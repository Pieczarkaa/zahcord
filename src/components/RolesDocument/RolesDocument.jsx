import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { firestore } from '../../firebase/firebase'
import './RolesDocument.scss'
import RolesDocumentmap from './RolesDocumentmap'


const RolesDocument = () => {
    const roleid=useSelector((state)=>state.currentserver.roleid);
    const roleRef=firestore.collection('roles').doc(roleid).collection('rolemenu');
    const query=roleRef.orderBy('createdAt').limit(10);
    const [roles]=useCollectionData(query,{idField:'id'});
    return (
        <>
            <div className="rolesdocument">
                <div className="rolesdocument__main">
                    <div className="rolesdocument__header">
                        {roles && roles.map((role)=>{
                            return <RolesDocumentmap key={role.id} role={role} roledoc={roleid}/>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RolesDocument
