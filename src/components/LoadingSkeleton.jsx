import React from 'react';
import isEmpty from 'lodash/isEmpty';
import {Skeleton, Button, Card, CardContent, CardActions, Typography, IconButton, Box, CircularProgress } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

const SkeletonType = (type) => {
  return (
    <div>
      {type === 'table' && 
        <div>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="rounded" height={60} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rounded" height={60} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="rounded" height={60} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rounded" height={60} />
        </div>
      }
      {
        type === 'chart' && 
        <Box display={"flex"} sx={{flex: 1, height: '200%', marginTop: '20', justifyContent: 'center', alignContent: 'center'}} >
          <CircularProgress />
        </Box>
      }
      {
        type === 'card' &&
        <div>
          <Skeleton variant="rectangular" width={300} height={350} />
          <Skeleton />
          <Skeleton width="60%" />
          <Skeleton variant="rectangular" width={300} height={100} />
          <Skeleton width="60%" />
        </div>
      }
    </div>
  );
}

const Suspense = (props) => {
    const {
      loading,
      error,
      data,
      onRetry = () => {},
      style: cssStyle = { minHeight: 200 },
      children,
      type,
    } = props;
    const isEmptyData = isEmpty(data);
    return (
      <Box style={{width: '100%', height: '100%'}}>
        {loading && SkeletonType(type)}
        {!(error || loading) && !isEmptyData && children}
        {!(error || loading) && isEmptyData && (
          <Box style={{ ...cssStyle }}>
            <Card>
              <CardContent>
                  <Typography variant="body2">
                      No Data
                  </Typography>
              </CardContent>
              <CardActions>
                  <IconButton aria-label=''>
                    <ReplayIcon />
                  </IconButton>
              </CardActions>
            </Card>
          </Box>
        )}
        {error && (
          <Box style={{ ...cssStyle }}>
            <Card variant="outlined"
              image={""}
              description= {data.msg || "Fail to get the data"}
              imageStyle={{ height: 40 }}
            >
              {
                <Button size="small" type="primary" onClick={onRetry}>
                  Retry
                </Button>
              }
            </Card>
          </Box>
        )}
      </Box>
    );
  };
  
  export default Suspense;