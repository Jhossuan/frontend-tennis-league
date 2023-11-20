import { Row as RowAntd } from "antd";
import styled from "styled-components";

export interface TextI {
    textColor?: string;
    $textalign?: string;
    marginLeft?: string;
    marginRight?: string;
    marginTop?: string;
    marginBottom?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;

    // Responsive Types
    textAlignR?: string
}

export const Row = styled(RowAntd)`
  width: 100%;
  min-height: 100vh;
  background: #0366d6;
`;

export const InputCard = styled.div`
    background: #fff;
    border-radius: 40px;
    min-height: 40%;
    width: 60%;
    box-shadow: 0px 10px 50px 1px #0003;
    padding: 50px;

    @media (min-width: 1600px){
      min-height: 20%;
      width: 50%;
    }

    @media (max-width: 768px){
      width: 90%;
      min-height: 40%;
    }
`

export const BigText = styled.p<TextI>`
    color: ${(props) => props.textColor || "#333333"};
    font-size: 3em;
    font-style: normal;
    font-weight: 700;
    text-align: ${(props) => props.$textalign || "center"};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};
    margin-top: ${(props) => props.marginTop || "0"};
    margin-bottom: ${(props) => props.marginBottom || "0"};

    @media (max-width: 992px){
      text-align: ${(props) => props.textAlignR || "center"};
      font-size: 2.2em
    }
`;

export const MediumText = styled.p<TextI>`
    color: ${(props) => props.textColor || "#333333"};
    font-size: ${(props) => props.fontSize || "1.6em"};
    font-style: normal;
    font-weight: ${(props) => props.fontWeight || 600};
    text-align: ${(props) => props.$textalign || "center"};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};
    line-height: ${(props) => props.lineHeight || "40px"};
    margin-top: 0;
    margin-bottom: 0;

    @media (max-width: 992px){
      text-align: ${(props) => props.textAlignR || "center"}
    }
`

export const SmallText = styled.p<TextI>`
    color: ${(props) => props.textColor || "#333333"};
    font-size: ${(props) => props.fontSize || "1.2em"};
    font-style: normal;
    font-weight: 500;
    text-align: ${(props) => props.$textalign || "center"};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};
    line-height: ${(props) => props.lineHeight || "40px"};
    margin-top: 0;
    margin-bottom: 0;

    @media (max-width: 992px){
      text-align: ${(props) => props.textAlignR || "center"}
    }
`