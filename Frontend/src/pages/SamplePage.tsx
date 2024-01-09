import { MotionContainer, varBounce } from '@components/animate';
import { Container, styled, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  margin: 'auto',
}));

export default function Page403() {
  return (
    <>
      <Helmet>
        <title>{`Sample page`}</title>
      </Helmet>

      <StyledContainer>
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              {`Sample page`}
            </Typography>
          </m.div>
        </MotionContainer>
      </StyledContainer>
    </>
  );
}
