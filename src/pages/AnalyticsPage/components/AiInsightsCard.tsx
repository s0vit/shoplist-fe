import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Button, Divider, Paper, Stack, Typography } from 'src/shared/ui-kit';
import type { TExpenseAnalyticsAiInsight } from 'src/shared/api/expenseAnalyticsApi.ts';

import styles from '../AnalyticsPage.module.scss';

type AiInsightsCardProps = {
  aiInsights?: TExpenseAnalyticsAiInsight;
  aiText: string;
  isAiLoading: boolean;
  isTyping: boolean;
  onRequestAi: () => void;
  isAnalyticsLoading: boolean;
};

const markdownComponents: Components = {
  p({ children }) {
    return (
      <Typography variant="body1" style={{ marginBottom: '8px' }}>
        {children}
      </Typography>
    );
  },
  ul({ children }) {
    return <ul style={{ margin: '0 0 8px', paddingLeft: '20px' }}>{children}</ul>;
  },
  ol({ children }) {
    return <ol style={{ margin: '0 0 8px', paddingLeft: '20px' }}>{children}</ol>;
  },
  li({ children }) {
    return (
      <li style={{ marginBottom: '4px' }}>
        <Typography variant="body1">{children}</Typography>
      </li>
    );
  },
  h2({ children }) {
    return (
      <Typography variant="h3" weight="bold" style={{ margin: '12px 0 4px' }}>
        {children}
      </Typography>
    );
  },
  h3({ children }) {
    return (
      <Typography variant="body1" weight="bold" style={{ margin: '12px 0 4px' }}>
        {children}
      </Typography>
    );
  },
  strong({ children }) {
    return <strong>{children}</strong>;
  },
  em({ children }) {
    return <em>{children}</em>;
  },
};

const AiInsightsCard = ({
  aiInsights,
  aiText,
  isAiLoading,
  isTyping,
  onRequestAi,
  isAnalyticsLoading,
}: AiInsightsCardProps) => {
  const { t, i18n } = useTranslation('analyticsPage');

  return (
    <AiCard>
      <Stack direction="row" gap={2} align="flex-start" justify="space-between" flexWrap="wrap">
        <Typography variant="h3">{t('ai.heading')}</Typography>
        <Button
          label={aiInsights ? t('ai.refresh') : t('ai.request')}
          variant="contained"
          width="auto"
          size="large"
          style={{ minWidth: '220px' }}
          disabled={isAiLoading || isAnalyticsLoading}
          onClick={onRequestAi}
        />
      </Stack>
      <Typography variant="body2" color="secondary" style={{ marginTop: '8px' }}>
        {t('ai.helper')}
        <br />
      </Typography>
      {isAiLoading && (
        <Typography variant="body2" color="secondary" style={{ marginTop: '12px' }}>
          {t('ai.loading')}
        </Typography>
      )}
      {aiInsights ? (
        <>
          <Typography variant="body2" color="secondary" style={{ marginTop: '12px' }}>
            {t('ai.model', { model: aiInsights.model })} -{' '}
            {t('ai.generated', {
              date: new Date(aiInsights.generatedAt).toLocaleString(i18n.language),
            })}
          </Typography>
          <Divider style={{ margin: '16px 0' }} />
          <MarkdownContainer className={styles.aiInsightText}>
            <div className={isTyping ? styles.typingCursor : undefined}>
              <ReactMarkdown components={markdownComponents}>{aiText}</ReactMarkdown>
            </div>
          </MarkdownContainer>
        </>
      ) : (
        !isAiLoading && (
          <Typography variant="body2" color="secondary" style={{ marginTop: '12px' }}>
            {t('ai.empty')}
          </Typography>
        )
      )}
    </AiCard>
  );
};

const AiCard = styled(Paper)`
  padding: 16px;
  white-space: pre-wrap;
`;

const MarkdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ul,
  ol {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 4px;
  }

  strong {
    font-weight: var(--font-weight-bold);
  }
`;

export default AiInsightsCard;
