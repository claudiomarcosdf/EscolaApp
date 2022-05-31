import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
export const styles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderRadius: '10px',
    marginBottom: '1px',
    backgroundColor: '#f1f2f6',
    padding: '0px 10px 0px 10px',
    marginRight: '5px',
    width: '400px'
  },
  boxColumn: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  }
}));
