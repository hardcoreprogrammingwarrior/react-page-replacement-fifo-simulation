/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { setFrames } from 'containers/App/actions';
import { makeSelectFrames } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import H1 from 'components/H1';
import Table from 'components/Table';
import messages from './messages';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 700,
  },
}));

export function FifoPage({frames, dispatch}) {
  const classes = useStyles();
  const [pages, setPages] = React.useState("3-6-4-2")
  const [loading, setLoading] = React.useState(false)
  const [restart, setRestart] = React.useState(false)
  const [hitRatio, setHitRatio] = React.useState(0)
  const [pageFaults, setPageFaults] = React.useState(0)

  const handlepagesChange = (e) => {
    const val = e.target.value // 3-6-4-23
    let with_dash
    if(val.length > 1){
      const no_dash = val.split('-').join('') // 3642
      with_dash = no_dash.match(/.{1,1}/g).join('-') // 3-6-4-2-3
    }

    setPages(with_dash)
  }

  const clear = async () => {
    dispatch(setFrames( [
      {memory: '', row:[]},
      {memory: '', row:[]},
      {memory: '', row:[]},
      {memory: '', row:[]}
    ]));
    setRestart(false)
  }

  const runSimulation = async () => {
    setLoading(true)

    setTimeout(function(){ 
      clear();
      let turns = 'one'
      let hit = false
      let hit_count = 0
      let fault_count = 0

      pages.split("-").map(function(val) {
        let checkempty = true
        
        // Check if memory is full
        if(frames[0]['memory'] === ""){
          frames[0]['memory'] = val
          checkempty = false
        }else if(frames[1]['memory'] === ""){
          frames[1]['memory'] = val
          checkempty = false
        }else if(frames[2]['memory'] === ""){
          frames[2]['memory'] = val
          checkempty = false
        }else{
          // memory is full, need to swap
        }
        // end of Check if memory is full

        if(checkempty){
          if(frames[0]['memory'] === val || frames[1]['memory'] === val|| frames[2]['memory'] === val){
            frames[3]['row'].push("✓")
            hit_count += 1
            hit = true
          }else{
            frames[3]['row'].push("✘")
            fault_count += 1
          }
        }else{
          frames[3]['row'].push("✘")
          fault_count += 1
        } 

        if(!hit){
          if(turns === 'one'){
            frames[0]['memory'] = val
            turns = 'two'
          }else if(turns === 'two'){
            frames[1]['memory'] = val
            turns = 'three'
          }else if(turns === 'three'){
            frames[2]['memory'] = val
            turns = 'one'
          }
        }

        frames[0]['row'].push(frames[0]['memory'])
        frames[1]['row'].push(frames[1]['memory'])
        frames[2]['row'].push(frames[2]['memory'])

        // Reset values
        hit = false
      })

      dispatch(setFrames(frames));
      setHitRatio(hit_count)
      setPageFaults(fault_count)
  
      setLoading(false)
      setRestart(true)
    }, 1000);

  }

  return (
    <div>
      <Helmet>
        <title>FIFO</title>
        <meta
          name="description"
          content="FIFO"
        />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                  id="standard-full-width"
                  label="pages"
                  style={{ margin: 8 }}
                  placeholder="1,2,3,4,5"
                  fullWidth
                  value={pages}
                  onChange={handlepagesChange}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={loading}
              />
            </Grid>
            {(pages && pages.length>1) && <>
              <Grid item xs={12}>
                <Table pages={pages} loading={loading} frames={frames}/>
              </Grid>
              <Grid item xs={12}>  
                Number of Hit Ratio = {hitRatio} <br/>
                Number of Page Faults = {pageFaults}
              </Grid>
              <Grid item xs={12}>
                <Button disabled={loading || restart} variant="outlined" color="primary" onClick={runSimulation} style={{marginRight:10}}>
                  Run Simulation
                </Button>
                <Button disabled={loading || !restart} variant="outlined" color="primary" onClick={clear}>
                  Clear
                </Button>
              </Grid>
            </>}
          </Grid>
        </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  frames: makeSelectFrames(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'FifoPage', reducer });

export default compose(withReducer,withConnect)(FifoPage);
