import { useTranslation } from 'react-i18next'
import { PageHeader, Section } from '../components/common/Section'
import { VisionCards } from '../components/VisionCards/VisionCards'
import { useSeo } from '../hooks/useSeo'

export default function Vision() {
  useSeo('vision')
  const { t } = useTranslation()
  return (
    <>
      <PageHeader eyebrow={t('vision.eyebrow')} title={t('vision.title')} subtitle={t('vision.subtitle')} />
      <Section>
        <VisionCards detailed />
      </Section>
    </>
  )
}
