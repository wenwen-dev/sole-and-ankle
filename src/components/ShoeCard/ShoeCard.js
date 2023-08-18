import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const STYLES = {


  }


  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {/* <BaseFlag>{variant}</BaseFlag> */}
          {variant === 'on-sale' && <SaleFlag>Sale</SaleFlag>}
          {variant === 'new-release' && <NewFlag>Just released!</NewFlag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{
            '--color': variant === 'on-sale' && COLORS.gray[700],
            '--text-decoration': variant === 'on-sale' && 'line-through',

          }}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  width: 344px;
  height: 370px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const ImageWrapper = styled.div`
  position: relative;
  min-width: 320px;

`;

const Image = styled.img`
  display: block;
  width: 100%;
  border-radius: 16px 16px 4px 4px;

`;


const BaseFlag = styled.div`
  position: absolute;
  color: ${COLORS.white};
  right: -4px;
  top: 12px;
  padding: 0 10px;
  height: 32px;
  line-height: 32px;
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  border-radius: 2px;
`;

const SaleFlag = styled(BaseFlag)`
  background-color: ${COLORS.primary};
`;

const NewFlag = styled(BaseFlag)`
  background-color: ${COLORS.secondary};
`;



const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
