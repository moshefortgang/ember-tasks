import Ember from 'ember';

export default Ember.Helper.helper(function(indexNum){ 
  if (indexNum) {
    return indexNum[0] + 1;
  }
});