
export const jobAdActions = (jobAd) => {
  return (dispatch, getState, {getFirestore}) => {
    // make async call to database
    const userId = getState().firebase.auth.uid
    const firestore = getFirestore();
    firestore.collection("employer").doc(userId).get().then(d => {
      const companyname = d.data().companyname;
      firestore.collection('jobposting').add({
        ...jobAd,
        employerid: userId,
        createdAt: new Date(),
        employername: companyname
      }).then(() => {
        console.log("Created job posting successfully")
        dispatch({ type: 'CREATE_JOBPOST_SUCCESS' });
      }).catch(err => {
        console.log("Job posting creation error")
        dispatch({ type: 'CREATE_JOBPOST_ERROR' }, err);
      });
    });
  }
};

export const jobUpdateActions = (jobAd) => {
  return (dispatch, getState, {getFirestore}) => {
    // make async call to database
    const userId = getState().firebase.auth.uid
    const firestore = getFirestore();
    const jobAdId = jobAd.jobAdId;

    firestore.collection("employer").doc(userId).get().then(d => {
      const companyname = d.data().companyname;
      firestore.collection('jobposting').doc(jobAdId).set({
        ...jobAd,
        employerid: userId,
        lastUpdatedAt: new Date(),
        employername: companyname
      }).then(() => {
        console.log("Updated job posting successfully")
        dispatch({ type: 'UPDATE_JOBPOST_SUCCESS' });
      }).catch(err => {
        console.log("Job posting update error")
        dispatch({ type: 'UPDATE_JOBPOST_ERROR' }, err);
      });
    });
  }
};

export const jobDeleteActions = (jobAdId) => {
console.log(jobAdId + "AAAAA")
  return (dispatch, getState, {getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    firestore.collection('jobposting').doc(jobAdId).delete().then(() => {
      console.log("Deleted job posting successfully")
      dispatch({ type: 'DELETE_JOBPOST_SUCCESS' });
    }).catch(err => {
      console.log("Job posting delete error")
      dispatch({ type: 'DELETE_JOBPOST_ERROR' }, err);
    });
  }
};