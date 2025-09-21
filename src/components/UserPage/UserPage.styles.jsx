import styled from 'styled-components';

export const Page = styled.main`
  min-height: 100vh;
  padding: 48px 24px;
  background: linear-gradient(180deg, #071021 0%, #0b1420 100%);
  color: #e6eef8;
  font-family: 'Roboto', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
  padding: 24px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    text-align: left;
  }
`;

export const HeaderInfo = styled.div`
  flex: 1;
  
  h1 {
    margin: 0 0 8px 0;
    font-size: 32px;
    font-weight: 800;
    background: linear-gradient(135deg, #e6eef8 0%, #cfe6ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const ProfileCard = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
  padding: 20px 24px;
  border-radius: 20px;
  box-shadow: 0 12px 28px rgba(2,6,23,0.6);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  min-width: 300px;
  
  @media (max-width: 768px) {
    min-width: 100%;
    padding: 16px 20px;
  }
`;

export const Avatar = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: white;
  font-size: 32px;
  box-shadow: 0 8px 20px rgba(59,130,246,0.3);
  flex-shrink: 0;
`;

export const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
  
  .username {
    font-weight: 700;
    font-size: 18px;
    color: #e6eef8;
    margin-bottom: 4px;
    line-height: 1.2;
  }
  
  .email {
    color: #9fb0c8;
    font-size: 14px;
    line-height: 1.3;
  }
`;

export const Sections = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 32px;
  gap: 24px;
`;


export const SectionTitle = styled.h2`
  margin:0 0 12px 0;
  font-size:16px;
  color:#d6e6fb;
  letter-spacing:0.2px;
`;

export const SmallMuted = styled.p`
  margin:0;
  color:#9fb0c8;
  font-size:14px;
`;

export const SectionCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  border-radius: 20px;
  padding: 28px;
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(2,6,23,0.4);
  min-width: 400px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #9fb0c8;
  background: rgba(255,255,255,0.02);
  border-radius: 12px;
  border: 2px dashed rgba(255,255,255,0.08);
  
  h3 {
    margin: 0 0 8px 0;
    color: #cfe6ff;
    font-size: 16px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ItemCount = styled.span`
  background: linear-gradient(90deg, #3b82f6, #7c3aed);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;
