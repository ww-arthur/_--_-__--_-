export const useFailSafe = (route = true) => {
    const isDirty = ref(false)
  
    window.addEventListener('beforeunload', (e) => {
      if (isDirty.value) {
        e.preventDefault()
      }
      else
      return false
  
    })
    if(route) {
    onBeforeRouteLeave(() => {
      if (isDirty.value) {
       const confirmed =  confirm('You have unsaved changes. Are you sure you want to leave?')
        return confirmed
      }
      return true
    })
    }
  
    return {
      isDirty
    }
  
  }