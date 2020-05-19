import { Home } from './Home'

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query HomeQuery {
    diorImage: imageSharp(id: { regex: "/dior.png/" }) {
      sizes(quality: 100) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
    flymbleImage: imageSharp(id: { regex: "/flymble.png/" }) {
      sizes(quality: 100) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
    sportyImage: imageSharp(id: { regex: "/sporty.jpg/" }) {
      sizes(quality: 100) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
    slide1: imageSharp(id: { regex: "/slide1.png/" }) {
      sizes(quality: 100, maxWidth: 2000) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
    slide2: imageSharp(id: { regex: "/slide2.png/" }) {
      sizes(quality: 100, maxWidth: 2000) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
    slide3: imageSharp(id: { regex: "/slide3.png/" }) {
      sizes(quality: 100, maxWidth: 2000) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
`
export default Home
