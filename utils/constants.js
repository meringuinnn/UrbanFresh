export const colors = {
    primary : '#21C622',
    headerText : '#3E3627',
    linkText : '##264CD0',
    mango : 'rgba(251, 255, 32, 0.4)',
    orange : 'rgba(254, 160, 74, 0.4)',
    avocado : 'rgba(155, 213, 60, 0.4)',
    watermelon : 'rgba(242, 154, 143, 0.4)',
    apple : 'rgba(207, 6, 6, 0.4)',
    pineapple : 'rgba(251, 209, 60, 0.4)',
    dragon : ' rgba(223, 54, 92, 0.4)'  

}

export const padding = {
    VPADDINGSM : {
        paddingTop : 10,
        paddingBottom : 10
    },
    VPADDINGMD : {
        paddingTop : 20,
        paddingBottom : 20
    },
    HPADDINGSM : {
        paddingLeft : 10,
        paddingRight : 10
    },
    HPADDINGMD : {
        paddingLeft : 20,
        paddingRight : 20
    }
}


export const uriToBlob = (uri) => {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);

    });

  }