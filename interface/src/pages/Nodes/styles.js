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

      button {
        color: #fff;
        font-size: 20px;
        align-items: center;
        text-decoration: none;
        margin-left: 30px;
        text-decoration: none;
        background: none;
        border: 0;
        margin-right: 30px;
      }

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
  flex-direction: column;

  button {
    background: none;
    border: none;
    color: #fff;
    font-size: 20px;
    align-items: center;
    margin-left: 30px;
    margin-top: 30px;

    img {
      width: 45px;
      height: 45px;
    }
  }
`;

export const Canvas = styled.div`
  padding-left: 160px;
  padding-top: 30px;

  label {
    color: #6202ee;
    font-weight: bold;
    font-size: 18px;
  }

  input {
    margin-left: 10px;
    margin-right: 20px;
    border-radius: 3px;
    border: 1px solid #eee;
    height: 30px;
  }

  .description {
    width: 200px;
  }

  .changeColor {
    font-size: 20px;
    align-items: center;
    height: 30px;
    background: #6202ee;
    color: #fff;
    border-radius: 5px;
    border: none;
    margin-left: 10px;
    width: 130px;
  }

  .picker {
    position: fixed;
    margin-left: 800px;
    background: #fff;
  }

  .add {
    background: #6202ee;
    color: #fff;
    font-size: 20px;
    align-items: center;
    height: 30px;
    width: 100px;
    border-radius: 5px;
    border: none;
    margin-left: 80px;
  }
`;

export const Line = styled.div`
  border: 0.7px solid #999;
  width: 100%;
  margin-top: 10px;
`;

export const Table = styled.div`
  padding-left: 160px;
  padding-top: 30px;

  table,
  th,
  td {
    border: 1px solid black;
  }

  table {
    flex-direction: row;
    align-items: center;
    border: 1px solid #000;

    thead {
      tr {
        th {
          width: 120px;
        }
      }
    }

    tbody {
      tr {
        th {
          font-weight: bold;
          width: 40px;
        }
      }
    }
  }
`;
