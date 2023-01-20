import '../css/mainSubs.css';
import '../css/subCategoryDocs.css';
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { CategoryImages, Icons, Images } from "../config/assets";
import { HelpCategoryLinks, HelpLinks, MainLinks } from "../config/links/links";
import { Title } from "../config/custom/titleheader";
import { Footer } from "../widgets/contents/widgets";
import { NoPage } from "./main";
import { ContactSupport } from '../widgets/container/link';
import { AnswerPageShimmer, CategoryPageShimmer } from '../widgets/contents/shimmer';

export const SubCategories = () => {
    const [open, setOpen] = useState(false);
    const [openSection, setOpenSection] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [questionMenu, setQuestionMenu] = useState(false);

    const { category, section } = useParams();
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState();

    const [loading, setLoading] = useState(false);
    const [noPage, setNoPage] = useState(false);

    useEffect(() => {
        setLoading(true)
        let cat = HelpCategoryLinks.find((link) => link.id === category)
        let sec = cat.subLinks.find((sublink) => sublink.id === section)
        if(sec || cat){
            setNoPage(false)
            setLoading(false)
            setFirst(cat)
            setSecond(sec)
        } else {
            setNoPage(true)
            setLoading(false)
        }
    }, [category, section, first, second]);

    const openAndClose = (index) => {
        setOpenSection(index);
        if(openSection === index){
            setIsOpen(!isOpen);
        }
    }
    const toggleQuestionMenu = () => setQuestionMenu(!questionMenu);

    if(second != null && loading !== true && noPage !== true){
        Title(`${second.title} || Serch Help`)
    } else if(loading !== true && noPage !== false){
        Title("Serch || Expecting you back")
    } else {
        Title("Loading || Serch Help");
    }

    if(second != null && loading !== true && noPage !== true){
        return(
            <div className="serch">
                <div className="mobileHeader">
                    <header className="headerMobile">
                        <div className="logo">
                            <a href={ MainLinks.home }> <img alt="" src={ Images.serch.serchLogo } width={30} height={30} /> </a>
                        </div>
                        {
                            open ? <div className={open ? 'openDrop DropDown' : "closeDrop DropDown"} onClick={()=>setOpen(!open)}>
                                {
                                    first.title === "Request/Clients" ? <div className="menu">
                                        <Link to={`/${first.id}`} className="menuLink">{first.title}</Link>
                                        <Link to={`/${HelpLinks.providers}`} className="menuLink">Provide/Providers</Link>
                                        <Link to={`/${HelpLinks.business}`} className="menuLink">Business</Link>
                                    </div>
                                    : first.title === "Provide/Providers" ? <div className="menu">
                                        <Link to={`/${first.id}`} className="menuLink">{first.title}</Link>
                                        <Link to={`/${HelpLinks.clients}`} className="menuLink">Request/Clients</Link>
                                        <Link to={`/${HelpLinks.business}`} className="menuLink">Business</Link>
                                    </div>
                                    : <div className="menu">
                                        <Link to={`/${first.id}`} className="menuLink">{first.title}</Link>
                                        <Link to={`/${HelpLinks.providers}`} className="menuLink">Provide/Providers</Link>
                                        <Link to={`/${HelpLinks.clients}`} className="menuLink">Request/Clients</Link>
                                    </div>
                                }
                                <img alt="arrow" src={ open ? Icons.arrowUp : Icons.closeIcon } width={18} className="menuArrow"/>
                            </div> : <div className={open ? 'openDrop DropDown' : "closeDrop DropDown"} onClick={()=>setOpen(!open)}>
                                <div className="menu">
                                    <article className="menuLink">{first.title}</article>
                                </div>
                                <img alt="arrow" src={ open ? Icons.closeIcon : Icons.arrowDown } width={18} className="menuArrow" />
                            </div>
                        }
                    </header>
                    <div className={questionMenu ? "openQuestion Menu" : "Menu"}>
                        <div className="arrowKeyBack" onClick={toggleQuestionMenu}>
                            <img alt="" src={ Icons.arrowLeft } width={18} />
                            <h5>Back</h5>
                        </div>
                        {
                            second.subLinks.map((link, index) => {
                                return <nav key={index}
                                    className={ isOpen && openSection === index ? "dropSub drop" : "downSub drop" }
                                    onClick={() => openAndClose(index)}
                                >
                                    <div className="subCategory">
                                        <h3> {link.title} </h3>
                                        <img alt="" src={ isOpen && openSection === index ? Icons.minus : Icons.plus } width={15} />
                                    </div>
                                    {
                                        link.subLinks.map((item, index) => {
                                            return <Link to={`${link.title}/${item.id}`} key={index}
                                                className="subSubCategory"
                                            >
                                                {item.title}
                                                <img alt="" src={Icons.arrowRighty} width={20}/>
                                            </Link>
                                        })
                                    }
                                </nav>
                            })
                        }
                    </div>
                    <div className="mobileRowLinks">
                        <div className="mobileLists"><img alt="" src={CategoryImages.option} onClick={toggleQuestionMenu}/></div>
                        <div className="rowLinks" >
                            <p className="rightCorner">{'||'}</p>
                            <Link to={`/${category}`} className="rowLink" > {first.title} </Link>
                            <p className="leftCorner">{'||'}</p>
                            <Link to={`/${category}/${section}`} className="rowLink"> {second.title} </Link>
                        </div>
                    </div>
                </div>
                <header className="headerTablet">
                    <div className="logo">
                        <a href={ MainLinks.home }> <img alt="" src={ Images.serch.serchLogo } width={30} height={30} /> </a>
                    </div>
                    {
                        open
                        ?   <div className={open ? 'openDrop DropDown' : "closeDrop DropDown"} onClick={()=>setOpen(!open)}>
                                {
                                    first.title === "Request/Clients" ? <div className="menu">
                                        <Link to={`/${first.id}`} className="menuLink">{first.title}</Link>
                                        <Link to={`/${HelpLinks.providers}`} className="menuLink">Provide/Providers</Link>
                                        <Link to={`/${HelpLinks.business}`} className="menuLink">Business</Link>
                                    </div>
                                    : first.title === "Provide/Providers" ? <div className="menu">
                                        <Link to={`/${first.id}`} className="menuLink">{first.title}</Link>
                                        <Link to={`/${HelpLinks.clients}`} className="menuLink">Request/Clients</Link>
                                        <Link to={`/${HelpLinks.business}`} className="menuLink">Business</Link>
                                    </div>
                                    : <div className="menu">
                                        <Link to={`/${first.id}`} className="menuLink">{first.title}</Link>
                                        <Link to={`/${HelpLinks.providers}`} className="menuLink">Provide/Providers</Link>
                                        <Link to={`/${HelpLinks.clients}`} className="menuLink">Request/Clients</Link>
                                    </div>
                                }
                                <img alt="arrow" src={ open ? Icons.arrowUp : Icons.closeIcon } width={18} className="menuArrow"/>
                            </div>
                        :   <div className={open ? 'openDrop DropDown' : "closeDrop DropDown"} onClick={()=>setOpen(!open)}>
                                <div className="menu">
                                    <article className="menuLink">{first.title}</article>
                                </div>
                                <img alt="arrow"
                                    src={ open ? Icons.closeIcon : Icons.arrowDown }
                                    width={18} className="menuArrow"
                                />
                            </div>
                    }
                </header>
                <div className="subCategoryLinks" >
                    <aside className="questionsGrid">
                        <ContactSupport link={"/"}/>
                        {
                            second.subLinks.map((link, index) => {
                                return <nav key={index}
                                    className={ isOpen && openSection === index ? "dropSub drop" : "downSub drop" }
                                    onClick={() => openAndClose(index)}
                                >
                                    <div className="subCategory">
                                        <h3> {link.title} </h3>
                                        <img alt="" src={ isOpen && openSection === index ? Icons.minus : Icons.plus } width={15} />
                                    </div>
                                    {
                                        link.subLinks.map((item, index) => {
                                            return <Link to={`${link.title}/${item.id}`} key={index}
                                                className="subSubCategory"
                                            >
                                                {item.title}
                                                <img alt="" src={Icons.arrowRighty} width={20}/>
                                            </Link>
                                        })
                                    }
                                </nav>
                            })
                        }
                    </aside>
                    <Outlet />
                </div>
                <Footer />
            </div>
        );
    } else if(loading !== true && noPage !== false) {
        return <NoPage />
    } else {
        return <CategoryPageShimmer />
    }
}

export const AnswerQuestionMap = () => {
    const { category, section} = useParams();
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState();

    const [loading, setLoading] = useState(true);
    const [noPage, setNoPage] = useState(false);

    useEffect(() => {
        setLoading(true)
        let cat = HelpCategoryLinks.find((link) => link.id === category)
        let sub = cat.subLinks.find((subLink) => subLink.id === section)
        if(sub){
            setNoPage(false)
            setLoading(false)
            setFirst(cat)
            setSecond(sub)
        } else {
            setNoPage(true)
            setLoading(false)
        }
    }, [category, section, first, second]);

    if(second != null && loading !== true && noPage !== true){
        return(
            <main className="answersGrid" >
                <div className="keyHeaderTablet">
                    <a href={ "/" } className="keyArrowBack">
                        <img alt="" src={ Icons.arrowLeft } width={25} />
                        <h3>Back to Help Hub</h3>
                    </a>
                </div>
                <div className="keyHeadTablet">
                    <div className="rowLinks" >
                        <p className="rightCorner">{'||'}</p>
                        <Link to={`/${first.id}`} className="rowLink" > {first.title} </Link>
                        <p className="leftCorner">{'||'}</p>
                        <Link to={`/${first.id}/${second.id}`} className="rowLink"> {second.title} </Link>
                    </div>
                </div>
                {
                    second.subLinks.map((link, index) => {
                        return <nav key={index}>
                            <div className="subCategory">
                                <h2> {link.title} </h2>
                            </div>
                            {
                                link.subLinks.map((item, index) => {
                                    return <Link to={`${link.title}/${item.id}`} key={index}
                                        className="droppedSub drop"
                                    >
                                        {item.title}
                                    </Link>
                                })
                            }
                        </nav>
                    })
                }
            </main>
        );
    } else if(loading !== true && (second == null || noPage !== false)) {
        return <div>Sorry, not found</div>
    } else {
        return <AnswerPageShimmer />
    }
}

export const AnswerDescription = () => {
    const { category, section, questionSection, question } = useParams();
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState();
    const [third, setThird] = useState([]);
    const [fourth, setFourth] = useState([]);

    const [loading, setLoading] = useState(true);
    const [noPage, setNoPage] = useState(false);

    useEffect(() => {
        setLoading(true)
        let cat = HelpCategoryLinks.find((link) => link.id === category)
        let subCat = cat.subLinks.find((sub) => sub.id === section)
        let quest = subCat.subLinks.find((title) => title.title === questionSection)
        let final = quest.subLinks.find((ask) => ask.id === question)
        if(final){
            setNoPage(false)
            setLoading(false)
            setFirst(cat)
            setSecond(subCat)
            setThird(quest)
            setFourth(final)
        } else {
            setNoPage(true)
            setLoading(false)
        }
    }, [category, section, questionSection, question, first, second, third, fourth]);

    if(fourth != null && loading !== true && noPage !== true){
        return(
            <main>
                <div className="keyHeaderTablet">
                    <a href={ "/" } className="keyArrowBack">
                        <img alt="" src={ Icons.arrowLeft } width={25} />
                        <h3>Back to Help Hub</h3>
                    </a>
                </div>
                <div className="keyHeadTablet">
                    <div className="rowLinks" >
                        <p className="rightCorner">{'||'}</p>
                        <Link to={`/${first.id}`} className="rowLink" > {first.title} </Link>
                        <p className="leftCorner">{'||'}</p>
                        <Link to={`/${first.id}/${second.id}`} className="rowLink"> {second.title} </Link>
                        <p className="leftCorner">{'||'}</p>
                        <Link to={`/${first.id}/${second.id}/${questionSection}/${question}`} className="rowLink"> {fourth.title} </Link>
                    </div>
                </div>
                <div>Hi</div>
            </main>
        );
    } else if(loading !== true && (second == null || noPage !== false)) {
        return <div>Sorry, not found</div>
    } else {
        return <AnswerPageShimmer />
    }
}