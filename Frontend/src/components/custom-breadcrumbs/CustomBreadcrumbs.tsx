/* eslint-disable react/no-multi-comp */
import { Box, Breadcrumbs, IconButton, Link, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Iconify from '../iconify';
import Label from '../label/Label';
import LinkItem from './LinkItem';
import { CustomBreadcrumbsProps } from './types';

// ----------------------------------------------------------------------

export default function CustomBreadcrumbs({
  links,
  action,
  heading,
  moreLink,
  activeLast,
  backLink,
  headingAdditionals,
  sx,
  onBackClick,
  ...other
}: CustomBreadcrumbsProps) {
  const navigate = useNavigate();
  const lastLink = links[links.length - 1].name;

  if (backLink !== undefined) {
    onBackClick = () => navigate(backLink);
  }
  const backBtnVisible: boolean = Boolean(backLink) || Boolean(onBackClick);
  return (
    <Box sx={{ mb: 3, ...sx }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row">
            {/* BACK */}
            {backBtnVisible && (
              <IconButton onClick={onBackClick} sx={{ mb: 1, mr: 1 }}>
                <Iconify icon="mdi:arrow-left" />
              </IconButton>
            )}

            {/* HEADING */}
            {heading && (
              <>
                <Typography variant="h4" gutterBottom>
                  {heading}
                </Typography>

                {!import.meta.env.PROD && (
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 3, pb: 1 }}>
                    <Label>{import.meta.env.MODE}</Label>
                  </Box>
                )}

                {/* HEADING ADDITIONALS */}
                {headingAdditionals && <Box sx={{ ml: 5 }}>{headingAdditionals}</Box>}
              </>
            )}
          </Stack>

          {/* BREADCRUMBS */}
          {!!links.length && (
            <Breadcrumbs separator={<Separator />} {...other}>
              {links.map((link) => (
                <LinkItem
                  key={link.name || ''}
                  link={link}
                  activeLast={activeLast}
                  disabled={!link.href || link.name === lastLink}
                />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>

      {/* MORE LINK */}
      {!!moreLink && (
        <Box sx={{ mt: 2 }}>
          {moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Separator() {
  return (
    <Box
      component="span"
      sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }}
    />
  );
}
