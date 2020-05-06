import styled from 'styled-components';

export const Container = styled.div`
  background: #f5f5f5;
  justify-content: center;
  flex: 1;
`;

export const HeaderMenu = styled.div`
  flex: 1;
  align-items: center;

  header {
    background-color: #01a39d;
    text-align: center;
    font-size: 35px;
    color: white;
    height: 60px;

    h6 {
      float: left;
      align-items: center;
      margin-top: 12px;
      padding-left: 160px;
    }

    div {
      float: right;
      align-items: center;
      padding-right: 80px;

      a {
        color: #fff;
        font-size: 20px;
        align-items: center;
        text-decoration: none;
      }

      a + a {
        margin-left: 30px;
      }

      svg {
        align-items: center;
        margin-right: 5px;
      }
    }
  }
`;

export const SideNav = styled.div`
  height: 100%;
  position: fixed;
  z-index: 1;
  background-color: #01a39d;
  overflow-x: hidden;
  width: 110px;
  position: absolute;

  a {
    padding: 6px 6px 6px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;

    .circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #6202ee;
      margin-top: 40px;
    }

    .triangle {
      width: 0;
      height: 0;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      border-bottom: 50px solid #6202ee;
      margin-top: 40px;
    }

    .rectangle {
      width: 50px;
      height: 50px;
      background: #6202ee;
      margin-top: 40px;
    }

    img {
      width: 50px;
      height: 50px;
      margin-top: 40px;
    }
  }
`;
