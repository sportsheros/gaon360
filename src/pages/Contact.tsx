import { useTranslation } from 'react-i18next'
import { PageHeader, Section } from '../components/common/Section'
import { ContactCards } from '../components/Contact/ContactCards'
import { Suggestion } from '../components/Contact/Suggestion'
import { useSeo } from '../hooks/useSeo'

export default function Contact() {
  useSeo('contact')
  const { t } = useTranslation()
  return (
    <>
      <PageHeader eyebrow={t('contact.eyebrow')} title={t('contact.title')} subtitle={t('contact.subtitle')} />
      <Section>
        <ContactCards />
      </Section>
      <Suggestion />
    </>
  )
}
