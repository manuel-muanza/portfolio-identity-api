interface ArchitecturePanelProps {
  open: boolean
  onClose: () => void
}

const architectureItems = [
  'Domain-Driven Design (DDD)',
  'Arquitetura em camadas',
  'Clean Architecture',
  'Hexagonal Architecture',
  'Microsserviços',
  'Arquitetura orientada a eventos',
]

const practiceItems = [
  'Separação entre domínio, aplicação, infraestrutura e interfaces HTTP',
  'Repository Pattern',
  'Dependency Injection',
  'Value Objects',
  'Use Cases',
  'DTOs',
  'Tratamento global de erros',
  'Transações',
  'Paginação, filtros e ordenação',
  'Outbox Pattern',
  'Configuração através de variáveis de ambiente',
]

const technologies = [
  'Java 21',
  'Spring Boot',
  'Spring Security',
  'REST APIs',
  'PostgreSQL',
  'Spring JDBC',
  'Redis',
  'RabbitMQ',
  'Flyway',
  'AWS S3',
  'AWS SQS',
  'AWS KMS',
  'AWS Secrets Manager',
  'JWT',
  'OAuth 2.0',
  'MFA',
  'Docker Compose',
  'Grafana',
  'Loki',
  'Maven',
]

export function ArchitecturePanel({ open, onClose }: ArchitecturePanelProps) {
  return (
    <>
      <button
        className={`architecture-backdrop ${open ? 'visible' : ''}`}
        type="button"
        aria-label="Fechar arquitetura"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside className={`architecture-panel ${open ? 'open' : ''}`} aria-hidden={!open}>
        <header className="architecture-panel-header">
          <div className="architecture-title-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="8.5" y="14" width="7" height="7" rx="1" />
              <path d="M6.5 10v2h11v-2M12 12v2" />
            </svg>
          </div>
          <div>
            <h2>Arquitetura e práticas</h2>
            <p>Decisões técnicas demonstradas neste projeto</p>
          </div>
          <button className="architecture-close" type="button" aria-label="Fechar" onClick={onClose}>×</button>
        </header>

        <div className="architecture-panel-content">
          <p className="architecture-intro">
            O projeto demonstra experiência na construção de sistemas seguros, escaláveis e organizados em torno do domínio.
          </p>

          <section className="architecture-section">
            <h3>Abordagem arquitetural</h3>
            <div className="architecture-grid">
              {architectureItems.map((item) => <span key={item}>{item}</span>)}
            </div>
          </section>

          <section className="architecture-section">
            <h3>Padrões e práticas</h3>
            <ul className="practice-list">
              {practiceItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section className="architecture-section">
            <h3>Tecnologias utilizadas</h3>
            <div className="technology-list">
              {technologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </section>
        </div>
      </aside>
    </>
  )
}
