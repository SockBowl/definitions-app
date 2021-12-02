const styles = (theme) => ({
  root: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column'
  },
  formContainer: {
    width: '100%',
    height: '80%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    margin: theme.spacing(1),
    height: 50
  },
  searchInput: {
    width: '40%'
  }
});

export default styles;
