export const onEditCustomerPage = () => {
  if (
    document.location.pathname.indexOf("card") >= 0 ||
    document.location.pathname.indexOf("edit") >= 0
  ) {
    return true;
  } else {
    return false;
  }
};
