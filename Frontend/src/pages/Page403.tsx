import { MotionContainer, varBounce } from '@components/animate';
import { useLocales } from '@locales';
import { Container, styled, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import { ForbiddenIllustration } from '../assets/illustrations';

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
  const { translate } = useLocales();
  return (
    <>
      <Helmet>
        <title>{`${translate('errorPages.403.title')}`}</title>
      </Helmet>

      <StyledContainer>
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              {`${translate('errorPages.403.header')}`}
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              {`${translate('errorPages.403.message')}`}
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
          </m.div>
        </MotionContainer>
      </StyledContainer>
    </>
  );
}
