import logo from '../assets/shibir.png'
const Footer = () => {
    return (
        <footer className="bg-[#1b1b1b] flex flex-col lg:flex-row lg:justify-around lg:items-center text-white mt-48 pt-20 lg:px-[10%] px-[5%] p-10 hind">
            <aside className='hind'>
                <img src={logo} className='w-36' />
                <p className='text-xl'>
                    বাংলাদেশ ইসলামি ছাত্রশিবির
                    <br />
                    ঢাকা মহানগর দক্ষিণ, মাতুয়াইল পূর্ব থানা
                </p>
            </aside>
            <nav className='flex flex-col'>
                <h6 className="footer-title">ফেসবুক লিংকস</h6>
                <a target='_blank' href='https://www.facebook.com/bangladeshislamichhatrashibir' className="link link-hover">বিআইসিএস</a>
                <a target='_blank' href='https://www.facebook.com/bics.dcs' className="link link-hover">বিআইসিএস ডিসিএস</a>
                <a className="link link-hover">বিআইসিএস ডিসিএস মাতুয়াইল পূর্ব</a>
            </nav>
            <nav className='flex flex-col'>
                <h6 className="footer-title">ওয়েবসাইট লিংকস</h6>
                <a target='_blank' href='https://www.shibir.org.bd/' className="link link-hover">বিআইসিএস</a>
                <a target='_blank' href='https://www.jahidulislambd.info/' className="link link-hover">কেন্দ্রীয় সভাপতি</a>
                <a target='_blank' href='https://www.chhatrasangbadbd.com/' className="link link-hover">মাসিক প্রকাশনাঃ ছাত্রসংবাদ</a>
            </nav>
            <nav className='flex flex-col'>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;

// flex flex-col lg:flex-row lg:justify-around justify-center lg:items-end items-center