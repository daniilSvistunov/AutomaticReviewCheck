import { MotionContainer, varBounce } from '@components/animate';
import { i18n } from '@locales';
import { Button, Container, styled, Typography } from '@mui/material';
import { PATH_PAGE } from '@routes/paths';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { PageNotFoundIllustration } from '../../assets/illustrations';

// ----------------------------------------------------------------------

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  margin: 'auto',
}));

export default function Page404() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>{`${i18n.t('errorPages.404.title')}`}</title>
      </Helmet>

      <StyledContainer>
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              {`${i18n.t('errorPages.404.header')}`}
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', fontSize: '1rem', width: '25rem' }}
            >
              {`${i18n.t('errorPages.404.message')}`}
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
          </m.div>
          <m.div variants={varBounce().in}>
            <Button onClick={() => navigate(PATH_PAGE.root)} variant="contained">
              {`${i18n.t('errorPages.404.button')}`}
            </Button>
          </m.div>
        </MotionContainer>
      </StyledContainer>
    </>
  );
}
